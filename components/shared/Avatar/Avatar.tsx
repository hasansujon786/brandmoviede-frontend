import { User } from "lucide-react";
import Image from "next/image";

interface AvatarProps {
  avatar?: string | null;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ avatar, size = 40 }) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = ""; // Set the fallback icon if image loading fails
  };

  return (
    <div className="bg-primary-50 text-primary flex size-16 items-center justify-center rounded-full">
      {avatar ? (
        <Image
          src={avatar}
          alt=" "
          width={size}
          height={size}
          unoptimized
          className="h-full w-full rounded-full object-cover"
          onError={handleError} // Handle image load failure
        />
      ) : (
        <User className="size-8" />
      )}
    </div>
  );
};

export default Avatar;
