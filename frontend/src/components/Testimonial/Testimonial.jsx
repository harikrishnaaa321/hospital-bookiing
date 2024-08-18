import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import patientAvatar from '../../assets/images/patient-avatar.png';
import { HiStar } from 'react-icons/hi';

const testimonials = [
  {
    id: 1,
    name: "Muhibar Rahman",
    text: "The service was exceptional. The staff was very professional and caring.",
    rating: 5
  },
  // Add more testimonials here
];

const items = testimonials.map((testimonial) => (
  <div key={testimonial.id} className="py-[30px] px-5 rounded-[13px] bg-white shadow-lg">
    <div className="flex items-center gap-[13px]">
      <img src={patientAvatar} alt={`${testimonial.name} Avatar`} />
      <div>
        <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
          {testimonial.name}
        </h4>
        <p className="text-[14px] leading-[24px] text-textColor">
          “{testimonial.text}”
        </p>
        <div className="flex gap-[2px] mt-2">
          {[...Array(testimonial.rating)].map((_, index) => (
            <HiStar key={index} className="text-yellow-500" />
          ))}
        </div>
      </div>
    </div>
  </div>
));

const Testimonial = () => {
  return (
    <div className="mt-[30px] lg:mt-[55px]">
      <AliceCarousel
        items={items}
        responsive={{
          0: { items: 1 },
          768: { items: 2 },
          1024: { items: 3 }
        }}
        autoPlay
        autoPlayInterval={3000}
        infinite
      />
    </div>
  );
};

export default Testimonial;
