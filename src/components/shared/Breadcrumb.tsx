import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbProps {
  children?: ReactNode;
  items: Array<{
    label: string;
    href: string;
  }>;
}

export const Breadcrumb = ({ children, items }: BreadcrumbProps) => {
  return (
    <div className="breadcrumbs text-2xl w-full mb-2 p-0 dark:bg-gray-700 bg-gray-200 rounded-none flex align-middle justify-between">
      <ul className="text-2xl p-0 m-0">
        {items.map((item: { label: string; href: string }) => (
          <li key={item.href} className="p-2 text-black dark:text-white">
            <Link className="rounded-none m-0" to={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};
