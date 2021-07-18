import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageRefService } from "./session-storage-ref.service";

@Injectable({ providedIn: "root" })
export class LocalStorageService {
  private _localStorage: Storage;

  private _myData$ = new BehaviorSubject<any>(null);
  myData$ = this._myData$.asObservable();

  constructor(private _localStorageRefService: LocalStorageRefService) {
    this._localStorage = this._localStorageRefService.localStorage;
  }

  setInfo(key: string, data: any): any {
    const jsonData = JSON.stringify(data);
    this._localStorage.setItem(key, jsonData);
    this._myData$.next(data);
  }

  loadInfo(key: string): any {
    if(this._localStorage.getItem(key)){
        const data = JSON.parse(this._localStorage.getItem(key) || '');
        this._myData$.next(data);
        return data;
    }
    return null;
  }

  clearInfo(key: string) {
    this._localStorage.removeItem(key);
    this._myData$.next(null);
  }

  clearAllLocalStorage(): void {
    this._localStorage.clear();
    this._myData$.next(null);
  }
}
