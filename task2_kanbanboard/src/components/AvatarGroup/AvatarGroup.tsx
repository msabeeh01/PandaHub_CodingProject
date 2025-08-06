// src/components/AvatarGroup.tsx
import Image from "next/image";

type AvatarGroupProps = {
  max?: number;
  size?: number;
};

export default function AvatarGroup({ max = 4, size = 38 }: AvatarGroupProps) {
  const displayed = Array.from({ length: max }, (_, idx) => idx);

  return (
    <div className="flex items-center">
      {displayed.map((_, idx) => (
        <div
          key={idx}
          className="-ml-2 first:ml-0 rounded-full border-2 border-white"
        >
          <Image
            src="/placeholder-avatar.webp" // replace with your placeholder image URL
            alt="Placeholder Avatar"
            width={size}
            height={size}
            className="rounded-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
