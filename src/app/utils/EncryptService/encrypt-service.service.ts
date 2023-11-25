import { Injectable } from '@angular/core';
import JSEncrypt  from  'jsencrypt';

@Injectable({
  providedIn: 'root'
})
export class EncryptServiceService {

  pubKey: string;

  constructor() {
    
  }

  setPublicKey(pubKey : string)
  {
    this.pubKey = pubKey;
  }

  public Encrypt(plaingText: string ): string 
  {
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey(this.pubKey);
    return encrypt.encrypt(plaingText);
  };

  public EncryptText(plaingText: string, publicKey: string  ): string 
  {
    this.pubKey = publicKey;
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey(this.pubKey);
    return encrypt.encrypt(plaingText);
  };
}
