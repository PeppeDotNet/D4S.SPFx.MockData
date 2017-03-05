import * as Model from '../models/Model';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export interface IDataManager {
  SPContext: IWebPartContext;
  ListId: string;

  GetLists(): Promise<Model.IList[]>;
}
export { MockDataManager } from './MockDataManager';
export { SPDataManager } from './SPDataManager';