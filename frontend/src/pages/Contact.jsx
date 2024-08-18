import React from "react";

const Contact = () => {
  return (
    <div className="px-4 mx-auto max-w-screen-md">
      <h2 className="heading text-center">contact us</h2>
      <p className="mb-8 lg:mb-16 font-light text-center text__">
        got a technical issue? want to send feedvack about a beta feature? let
        us know
      </p>
      <form action="#" className="space-y-8">
        <div>
          <label htmlFor="email" className="form__label">
            Your email
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            className="form__input mt-1"
          />
        </div>
        <div >
          <label htmlFor="subject" className="form__label">
           subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="let us know how we can help you"
            className="form__input mt-1"
          />
        </div>
        <div className='sm:col-span-2'>
          <label htmlFor="message" className="form__label">
          your message
          </label>
          <textarea
          rows='6'
            type="text"
            id="message"
            placeholder="leave a comment"
            className="form__input mt-1"
          />
        </div>
        <button type="submit" className="btn rounded sm:w-fit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
