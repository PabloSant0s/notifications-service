export class Content {
  private readonly content: string;

  constructor(content: string) {
    const isContentLegthValid = this.validateContentLength(content);
    if (!isContentLegthValid) throw new Error('Content Length error.');

    this.content = content;
  }

  public get value(): string {
    return this.content;
  }

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }
}
