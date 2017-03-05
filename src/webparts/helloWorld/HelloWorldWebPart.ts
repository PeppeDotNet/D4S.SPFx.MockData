import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IHelloWorldWebPartProps } from './IHelloWorldWebPartProps';
import * as Managers from './managers/Managers';
import { Dictionary } from 'sp-pnp-js';

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  private _managers = new Dictionary(
    [EnvironmentType.Local.toString(), EnvironmentType.SharePoint.toString()],
    [new Managers.MockDataManager(), new Managers.SPDataManager()]
  );
  private _dataManger: Managers.IDataManager;

  public onInit(): Promise<void> {
    this._dataManger = this._managers.get(Environment.type.toString());
    this._dataManger.SPContext = this.context;

    return super.onInit();
  };

  public render(): void {
    this._dataManger.GetLists().then((results) => {
      var html = "<ul>";
      results.forEach(element => {
        html += "<li>" + element.Title + "</li>";
      });
      html += "</ul>";
      this.domElement.innerHTML = html;
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
