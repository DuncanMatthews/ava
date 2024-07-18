('use node');

import { internalAction, internalMutation } from './_generated/server';
import { v } from 'convex/values';
import Replicate from 'replicate';
import { api, internal } from './_generated/api';

interface whisperOutput {
  text: string;
  detected_language: string;
  segments: any;
  transcription: string;
  translation: string | null;
}

export const chat = internalAction({
  args: {
    fileUrl: v.string(),
    id: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.REPLICATE_API_KEY;
    if (!apiKey) {
      throw new Error("REPLICATE_API_KEY is not set in the environment variables");
    }

    const replicate = new Replicate({
      auth: apiKey,
    });

    const replicateOutput = (await replicate.run(
      'vaibhavs10/incredibly-fast-whisper:3ab86df6c8f54c11309d4d1f930ac292bad43ace52d10c80d87eb258b3c9f79c',
      {
        input: {
          audio: args.fileUrl,
          batch_size: 64,
        },
      },
    )) as whisperOutput;

    const transcript = replicateOutput.text || 'error';

    console.log('transcript', transcript);

    await ctx.runMutation(internal.whisper.saveTranscript, {
      id: args.id,
      transcript,
    });
  },
});

export const saveTranscript = internalMutation({
  args: {
    id: v.id('notes'),
    transcript: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, transcript } = args;

    await ctx.db.patch(id, {
      transcription: transcript,
      generatingTranscript: false,
    });

    await ctx.scheduler.runAfter(0, internal.together.chat, {
      id: args.id,
      transcript,
    });

    await ctx.scheduler.runAfter(0, internal.together.embed, {
      id: args.id,
      transcript: transcript,
    });
  },
});