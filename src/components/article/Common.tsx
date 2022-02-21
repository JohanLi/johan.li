import { ReactNode } from 'react';

type PropsString = {
  children: string;
};

type PropsNode = {
  children: ReactNode;
};

export function H2({ children }: PropsString) {
  return (
    <h2 className="mt-12 mb-6 text-xl md:text-2xl font-bold">{children}</h2>
  );
}

export function H3({ children }: PropsString) {
  return (
    <h3 className="mt-12 mb-6 text-base md:text-lg font-bold">{children}</h3>
  );
}

export function P({ children }: PropsNode) {
  return <p className="mt-6">{children}</p>;
}

export function Ul({ children }: PropsNode) {
  return <ul className="mt-6 list-disc pl-8 space-y-4">{children}</ul>;
}

export function UlReferences({ children }: PropsNode) {
  return <ul className="mt-4 list-disc pl-6 space-y-2 text-xs">{children}</ul>;
}
