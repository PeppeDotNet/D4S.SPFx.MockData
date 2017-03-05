import * as Model from '../models/Model';
import { IDataManager } from './Managers';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export class MockDataManager implements IDataManager {

  public SPContext: IWebPartContext;
  public ListId: string;

  private _serverLoadDelay: number = 1000;

  public GetLists(): Promise<Model.IList[]> {
    return new Promise<Model.IList[]>((resolve, reject) => {
      //simulate server load...
      this.Sleep(this._serverLoadDelay).then(() => {
        var results = [
          { Title: "Contact list 1", Id: "f6785ba2-30a3-4b2d-a756-9371d416ae67" },
          { Title: "Contact list 2", Id: "cc475be1-b08b-49c4-9776-b26c31d18216" },
          { Title: "Contact list 3", Id: "3c15be57-41c8-45be-9456-abe04fbe00ed" }
        ];
        resolve(results);
      });
    });
  };

  private Sleep (delay) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
}