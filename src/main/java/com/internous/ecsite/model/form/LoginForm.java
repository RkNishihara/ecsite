package com.internous.ecsite.model.form;

import java.io.Serializable;

public class LoginForm implements Serializable{
	/*Serialize: オブジェクトとそのインスタンス変数をバイト列やXMLに変換する。
	 * オブジェクトをファイルとして保存したり、ネットワークで送信できるようにする。
	 * java.io.Serializableインターフェースをインプリメントする事で直列化*/
	private static final long serialVersionUID = 1L;
	/*final: これを設定した変数は1度しか値を代入できず、上書きできない。
	 * classに付けた場合は、継承ができなくなる。*/
	/*serialVersionUID: java.io.Serializableとセットで使用する。*/
	
	private String userName;
	private String password;
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName=userName;
	}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password=password;
	}
}
