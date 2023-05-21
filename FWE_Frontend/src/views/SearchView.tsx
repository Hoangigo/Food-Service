export default class SearchView {
  private _parentEl: HTMLElement | null;
  constructor() {
    this._parentEl = document.querySelector(".search");
  }

  getQuery() {
    const query = (
      this._parentEl?.querySelector(".search_field") as HTMLInputElement
    ).value;
    return query;
  }

  private _clearInput(): void {
    const inputElement = this._parentEl?.querySelector(
      ".search_field"
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
    }
  }

  addHandlerSearch(handler: () => void): void {
    if (this._parentEl) {
      this._parentEl?.addEventListener("submit", function (e) {
        e.preventDefault();
        handler();
      });
      handler();
    }
  }
}
