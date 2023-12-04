import { useEffect, useState } from 'react';
import axios from 'axios';
import AboutItem from './AboutUsItem';

interface AboutItemProps {
  id: number;
  image: string;
  icon: string;
  title: string;
  description: string;
}

const AboutUs = () => {
  const [aboutData, setAboutData] = useState<AboutItemProps[]>([]);

  useEffect(() => {
    axios
      .get('/aboutus.json')
      .then((res) => {
        // console.log("Data fetched successfully:", res.data);
        setAboutData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching aboutus.json:', error);
      });
  }, []);

  // console.log("aboutData:", aboutData);

  return (
    <div className="max-w-screen-xl mx-auto my-20 px-6">
      <h1 className="text-4xl poppins pb-4">
        Discover the Unique Advantages of Choosing Us
      </h1>
      <p className="text-gray-500 text-sm poppins w-2/2">
        "Embark on a Culinary Journey Like No Other, Where Every Dish Tells a
        Story of Flavor, Quality, and Unmatched Service."
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
        {Array.isArray(aboutData) && aboutData.length > 0 ? (
          aboutData.map((item) => <AboutItem key={item.id} {...item} />)
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
