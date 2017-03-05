import { IDataManager } from './Managers';
import * as Model from '../models/Model';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import pnp from 'sp-pnp-js';

export class SPDataManager implements IDataManager {
  public SPContext: IWebPartContext;
  public ListId: string;

  public GetLists(): Promise<Model.IList[]> {
    return new Promise<Model.IList[]>((resolve, reject) => {
      var results: Model.IList[] = [];
      pnp.sp.web.lists.select("Id", "Title").get().then((lists) => {
        lists.forEach(list => {
          results.push({ Id: list.Id, Title: list.Title });
        });
        resolve(results);
      });
    });
  };
}