import Header from '@/components/ui/Header';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-black '>
      <Header />
      {children}
    </div>
  );
};

export default DashboardLayout;
