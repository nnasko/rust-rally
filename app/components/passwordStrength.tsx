import { cn } from "clsx-tailwind-merge";

interface Props {
  passStrength: number;
}

const PasswordStrength = ({ passStrength }: Props) => {
  return (
    <div
      className={cn(" col-span-2 flex gap-1", {
        "justify-start": passStrength < 3,
      })}
    >
      {Array.from({ length: passStrength + 1 }).map((i, index) => (
        <div
          key={index}
          className={cn("h-2 w-24 rounded-md", {
            "bg-red-700": passStrength === 0,
            "bg-orange-600": passStrength === 1,
            "bg-green-700": passStrength === 3,
          })}
        ></div>
      ))}
    </div>
  );
};

export default PasswordStrength;