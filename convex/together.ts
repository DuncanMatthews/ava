import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import {
  internalAction,
  internalMutation,
  internalQuery,
} from './_generated/server';
import { v } from 'convex/values';
import { internal } from './_generated/api';
import { z } from 'zod';
import { actionWithUser } from './utils';

const API_KEY = process.env.API_KEY ?? 'undefined';

// Gemini client for LLM extraction
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

console.log("API Key (first 5 chars):", API_KEY.substring(0, 5)); // Debug: Log part of the API key

const NoteSchema = z.object({
  title: z
    .string()
    .describe('Short descriptive title of what the voice message is about'),
  summary: z
    .string()
    .describe(
      'A short summary in the first person point of view of the person recording the voice message',
    )
    .max(500),
  actionItems: z
    .array(z.string())
    .describe(
      'A list of action items from the voice note, short and to the point. Make sure all action item lists are fully resolved if they are nested',
    ),
});

export const chat = internalAction({
  args: {
    id: v.id('notes'),
    transcript: v.string(),
  },
  handler: async (ctx, args) => {
    const { transcript } = args;
    console.log("Starting chat function with transcript length:", transcript.length); // Debug

    try {
      const prompt = `
        The following is a transcript of a voice message. Extract a title, summary, and action items from it and answer in JSON in this format: {title: string, summary: string, actionItems: [string, string, ...]}

        Transcript: ${transcript}

        Requirements:
        - title: Short descriptive title of what the voice message is about
        - summary: A short summary (max 500 characters) in the first person point of view of the person recording the voice message
        - actionItems: A list of action items from the voice note, short and to the point. Make sure all action item lists are fully resolved if they are nested

        Important: Respond with the JSON object only, without any additional text or markdown formatting.
      `;

      console.log("Sending prompt to Gemini API"); // Debug
      const result = await model.generateContent(prompt);
      console.log(result)
      console.log("Received response from Gemini API"); // Debug
      const response = await result.response;
      let text = response.text();
      
      console.log("Raw response:", text); // Debug: Log the raw response

      // Remove any markdown code block syntax if present
      text = text.replace(/```json\s?/, '').replace(/```\s?$/, '');

      // Trim any whitespace
      text = text.trim();

      console.log("Cleaned response:", text); // Debug: Log the cleaned response

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(text);
        console.log("Successfully parsed JSON"); // Debug
      } catch (parseError) {
        console.error("JSON parsing error:", parseError); // Debug
        throw new Error("Failed to parse JSON response");
      }

      const { title, summary, actionItems } = NoteSchema.parse(parsedResponse);
      console.log("Extracted data:", { title, summary, actionItemsCount: actionItems.length }); // Debug

      await ctx.runMutation(internal.together.saveSummary, {
        id: args.id,
        summary,
        actionItems,
        title,
      });
      console.log("Summary saved successfully"); // Debug
    } catch (e) {
      console.error('Error in chat function:', e);
      await ctx.runMutation(internal.together.saveSummary, {
        id: args.id,
        summary: 'Summary failed to generate',
        actionItems: [],
        title: 'Title',
      });
      console.log("Fallback summary saved"); // Debug
    }
  },
});

export const getTranscript = internalQuery({
  args: {
    id: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    const note = await ctx.db.get(id);
    return note?.transcription;
  },
});

export const saveSummary = internalMutation({
  args: {
    id: v.id('notes'),
    summary: v.string(),
    title: v.string(),
    actionItems: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, summary, actionItems, title } = args;
    await ctx.db.patch(id, {
      summary: summary,
      title: title,
      generatingTitle: false,
    });

    let note = await ctx.db.get(id);

    if (!note) {
      console.error(`Couldn't find note ${id}`);
      return;
    }
    for (let actionItem of actionItems) {
      await ctx.db.insert('actionItems', {
        task: actionItem,
        noteId: id,
        userId: note.userId,
      });
    }

    await ctx.db.patch(id, {
      generatingActionItems: false,
    });
  },
});

export type SearchResult = {
  id: string;
  score: number;
};

export const similarNotes = actionWithUser({
  args: {
    searchQuery: v.string(),
  },
  handler: async (ctx, args): Promise<SearchResult[]> => {
    console.log("Starting similarNotes function with query:", args.searchQuery); // Debug
    const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });
    console.log("Generating embedding"); // Debug
    const result = await embeddingModel.embedContent(args.searchQuery);
    const embedding = result.embedding.values;
    console.log("Embedding generated, length:", embedding.length); // Debug

    // 2. Then search for similar notes
    console.log("Performing vector search"); // Debug
    const results = await ctx.vectorSearch('notes', 'by_embedding', {
      vector: embedding,
      limit: 16,
      filter: (q) => q.eq('userId', ctx.userId), // Only search my notes.
    });

    console.log("Vector search results:", results.length); // Debug

    return results.map((r) => ({
      id: r._id,
      score: r._score,
    }));
  },
});

export const embed = internalAction({
  args: {
    id: v.id('notes'),
    transcript: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("Starting embed function for note:", args.id); // Debug
    console.log("Transcript length:", args.transcript.length); // Debug
    const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });
    console.log("Generating embedding"); // Debug
    const result = await embeddingModel.embedContent(args.transcript);
    const embedding = result.embedding.values;
    console.log("Embedding generated, length:", embedding.length); // Debug

    await ctx.runMutation(internal.together.saveEmbedding, {
      id: args.id,
      embedding,
    });
    console.log("Embedding saved successfully"); // Debug
  },
});

export const saveEmbedding = internalMutation({
  args: {
    id: v.id('notes'),
    embedding: v.array(v.float64()),
  },
  handler: async (ctx, args) => {
    const { id, embedding } = args;
    await ctx.db.patch(id, {
      embedding: embedding,
    });
  },
});