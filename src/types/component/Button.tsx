export interface DynamicButton extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  bgColor?: "primary-color" | "secondary-color" | "error-color";
  textColor?: string;
  outlined?: boolean;
  haveError?: boolean;
  children: React.ReactNode;
  extendedClasses?:string;
}
