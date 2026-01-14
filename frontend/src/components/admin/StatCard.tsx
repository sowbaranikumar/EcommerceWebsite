import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  imgSrc?: string;
};

const StatCard = ({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  iconBg,
  iconColor,
  imgSrc,
}: StatCardProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl">
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>

        <p className="mt-2 text-3xl font-semibold text-gray-500">
          {value}
        </p>

        {/* <p
          className={`mt-1 text-sm ${isPositive ? "text-green-500" : "text-red-500"
            }`}
        >{change}
        </p> */}
        <p className="mt-1 text-sm text-gray-500">
           <span
              className={isPositive?"text-green-500":"text-red-500"}>
              {change.split(" ")[0]}
           </span>{" "}
              {change.split(" ").slice(1).join(" ")}
          </p>

      </div>

      <div className="flex flex-col items-center gap-2">
        <div className={`p-3 rounded-full ${iconBg} ${iconColor}`}>
          <Icon size={22} />
        </div>
        {imgSrc && (
          <img
            src={imgSrc}
            alt="stat"
            className="w-8 h-8"
          />
        )}
      </div>
    </div>
  );
};

export default StatCard;
