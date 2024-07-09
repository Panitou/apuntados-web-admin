import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="w-full bg-white text-black px-4 py-2 rounded-md shadow-[#a0a0a0] shadow-md mb-5"
  />
));
