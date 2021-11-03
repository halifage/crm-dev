import {Observable} from "rxjs";
import firebase from "firebase/compat";
import Unsubscribe = firebase.Unsubscribe;

export interface SubscriptionData {
  data: Observable<any>;
  unsubscribe: Unsubscribe;
}
