import {Context, createContext, ReactNode, useContext} from 'react';

export class ContextFactory<Value extends {} = {}> {
  private readonly defaultValue: symbol;
  private readonly context: Context<Value | symbol>;

  public constructor() {
    this.defaultValue = Symbol('default-context-value');
    this.context = createContext<Value | symbol>(this.defaultValue);

    this.ContextProvider = this.ContextProvider.bind(this);
    this.useContext = this.useContext.bind(this);
  }

  public ContextProvider(props: { children: ReactNode, value: Value }) {
    const {
      children,
      value,
    } = props;

    const ContextProvider = this.context.Provider;

    return (
      <ContextProvider value={value}>
        {children}
      </ContextProvider>
    );
  }

  public useContext(): Value {
    const context = useContext(this.context);
    if (context === this.defaultValue)
      throw new Error('Нельзя использовать контекст вне провайдера');

    return context as Value;
  }
}