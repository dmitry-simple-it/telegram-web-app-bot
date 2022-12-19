export const isClosedTag = (str: string) => {
  const stack: Array<'<' | '"' | "'" | '`'> = [];
  for (let i = 0; i < str.length; ++i) {
    const symbol = str[i];
    switch (symbol) {
      case '<':
      case '"':
      case "'":
      case '`':
        if (stack[stack.length - 1] === symbol) stack.pop();
        else stack.push(symbol);
        break;
      case '>':
        if (stack[stack.length - 1] === '<') stack.pop();
        break;
    }
  }
  return !!stack.length;
};
