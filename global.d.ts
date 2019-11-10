declare module '*.scss' {
  const classNames: {
    [className: string]: string;
  };
  export = classNames;
}

declare module '*.ico';
declare module '*.jpg';
declare module '*.png';
