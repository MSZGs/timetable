export class Template {
  private _template: HTMLTemplateElement;
  private _templateHtmlString: string;

  constructor(templateHtmlString: string) {
    this._templateHtmlString = templateHtmlString;
    this._template = document.createElement("template");
    this._template.innerHTML = templateHtmlString;
  }

  public addStyle(styleString: string): void {
    const style = document.createElement("style");
    style.innerHTML = styleString;
    this.template.appendChild(style);
  }

  public get templateHtmlString(): string {
    return this._templateHtmlString;
  }

  public get template(): HTMLTemplateElement {
    return this._template;
  }

  public clone(deep = true): Node {
    return this._template.content.cloneNode(deep);
  }
}

export default Template;
