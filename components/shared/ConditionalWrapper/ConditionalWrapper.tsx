"use client"

interface ConditionalWrapperProps extends React.PropsWithChildren {
  condition: boolean;
  wrapper: (children: React.ReactNode) => React.ReactNode;
}

function ConditionalWrapper({
  condition,
  wrapper,
  children,
}: ConditionalWrapperProps) {
  return condition ? wrapper(children) : children;
}

export default ConditionalWrapper
