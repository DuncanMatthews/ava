import Header from '@/components/ui/Header';
import Banner from '@/components/pages/home/Banner';
import DeviceSection from '@/components/pages/home/DeviceSection';

const HomePage = () => {
  return (
<div className="bg-radial-gradient">
      <Header />
      <Banner />
      <DeviceSection />
    </div>
  );
};

export default HomePage;
