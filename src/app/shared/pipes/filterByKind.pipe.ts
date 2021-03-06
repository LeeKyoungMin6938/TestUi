import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterByKind"
})
export class FilterByKindPipe implements PipeTransform {
  transform(items: any, select?: any): any {
    if (select !== "All") {
      return select
        ? items.filter(item => item["p_kind"] === select)
        : items;
    } else {
      return items;
    }
  }
}
