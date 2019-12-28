interface Props {
  staticContext?: StaticContext;
}

export interface StaticContext {
  statusCode: number;
}

const NotFound = (props: Props): null => {
  if (props.staticContext) {
    props.staticContext.statusCode = 404;
  }

  return null;
};

export default NotFound;
