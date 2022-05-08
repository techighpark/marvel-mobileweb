import Link from "next/link";

interface LinkComponentProps {
  path: string;
  children: React.ReactNode;
  [x: string]: any;
}

const LinkComponent = ({ path, children, ...rest }: LinkComponentProps) => {
  return (
    <Link href={path}>
      <a
        {...rest}
        className="cursor-pointer text-neutral-100 hover:text-neutral-400"
      >
        {children}
      </a>
    </Link>
  );
};

export default LinkComponent;
