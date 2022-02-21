import {Component} from '@angular/core';
import {Picker} from '../../../ui/picker/picker.component';
import {MatchQuery, OrQuery, TermQuery} from '../../shared/query.model';

@Component({
  selector: 'surveyor-searcher-query-picker',
  templateUrl: './query-picker.component.html',
  styleUrls: [ './query-picker.component.scss' ]
})
export class QueryPickerComponent extends Picker {

  queries: Array<string> = [];

  /*
  get params() {
    return this._params;
  }

  set params(params: any) {
    this._params = params;
    this.loadQuery(params);
  }
   */

  constructor() {
    super();
  }

  loadQuery(params: any) {
    if (params) {
      if (params.query && params.query instanceof OrQuery) {
        const orQuery = params.query as OrQuery;
        orQuery.of.forEach((query: any) => {
          if (query instanceof TermQuery) {
            query = query as TermQuery;
            this.queries.push(query.field + ':' + query.value);
          } else if (query instanceof MatchQuery) {
            query = query as MatchQuery;
            this.queries.push(query.value);
          }
        });
      }
    }
  }

  addQuery(queryText: string) {
    if (!this.queries.some(query => query === queryText)) {
      this.queries.push(queryText);
    }
  }

  removeQuery(index: number) {
    this.queries.splice(index, 1);
  }

  canSubmit(): boolean {
    return this.queries.length > 0;
  }

  submit() {
    const matchField = this.getMatchField();
    const bulkQuery = new OrQuery(this.queries.map(query => {
      if (query.indexOf(':') > 0) {
        const querySplit = query.split(':');
        return new TermQuery(querySplit[0], querySplit[1]);
      } else {
        return new MatchQuery(matchField, query);
      }
    }));

    this.pick({
      label: `Bulk: ${this.queries.length} items`,
      query: bulkQuery,
      type: 'picker'
    });
  }

  getMatchField(): string {
    return this.params.field || '_all';
  }
}
