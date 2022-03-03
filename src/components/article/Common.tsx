import React, { ReactNode } from 'react';
import { getSlug } from '../../utils';

type PropsString = {
  children: string;
};

type PropsNode = {
  children: ReactNode;
};

export function H1({ children }: PropsString) {
  return (
    <h1
      className="text-3xl md:text-5xl tracking-tight font-extrabold"
      id={getSlug(children)}
    >
      {children}
    </h1>
  );
}

export function H2({ children }: PropsString) {
  return (
    <h2
      className="pt-12 mb-6 text-xl md:text-2xl font-bold"
      id={getSlug(children)}
    >
      {children}
    </h2>
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

export function CodeInline({ children }: PropsString) {
  return <span className="bg-[#f5f2f0] p-0.5">{children}</span>;
}

export function Title({ children }: PropsString) {
  return <span className="font-bold italics">{children}</span>;
}

export function Quote({ children }: PropsNode) {
  return (
    <div className="my-12 -ml-4 pl-4 border-l-4 border-black italic">
      {children}
    </div>
  );
}
