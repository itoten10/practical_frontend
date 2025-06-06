"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import createCustomer from "./createCustomer";

export default function CreatePage() {
  const formRef = useRef();
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); //ページリロードを防ぐ
    const formData = new FormData(formRef.current);

    // customer_idを取得。後の三項演算子で使用する
    const customerId_check = formData.get("customer_id");
	
    // 三項演算子（書き方：条件式　？　真の場合　：　偽の場合）
	  //　条件式：customerId_checkがstringなら
	  //　真の場合：customerId_check.trim()を実行
	  //　偽の場合：""とする
	  //  最後に、真偽の場合に応じた結果をcustomerIdにいれる。
	  //　※この検証をバリデーションという。
	  const customerId = typeof customerId_check === "string" ? customerId_check.trim() : "";
  	//  customerIdが空、null、undefinedなど、値として
		//  成立していない状態ならtrueと判断する。
		//　「!」は否定 false×否定＝true → if文に入る
		if (!customerId){
			setError('Customer IDが空欄のため作成できません');
			return;	
		}
		//  エラー解除
		setError('');
		//  router.pushを修正
		router.push(`./create/confirm?customer_id=${customerId}`);

    await createCustomer(formData);
    router.push(`./create/confirm?customer_id=${formData.get("customer_id")}`);
  };

  return (
    <>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-md m-4">
        <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="card-body">
              <h2 className="card-title">
                <p>
                  <input
                    type="text"
                    name="customer_name"
                    placeholder="桃太郎"
                    className="input input-bordered"
                  />
                </p>
              </h2>
              <p>
                Customer ID:
                <input
                  type="text"
                  name="customer_id"
                  placeholder="C030"
                  className="input input-bordered"
                />
              </p>
              <p>
                Age:
                <input
                  type="number"
                  name="age"
                  placeholder="30"
                  className="input input-bordered"
                />
              </p>
              <p>
                Gender:
                <input
                  type="text"
                  name="gender"
                  placeholder="女"
                  className="input input-bordered"
                />
              </p>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary m-4 text-2xl">
                作成
              </button>
              {error && <p className="text-red-600">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
