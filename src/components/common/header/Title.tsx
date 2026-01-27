type TitleProps = {
  title: string;
  description: string;
};

export default function Title({ title, description }: TitleProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
}
