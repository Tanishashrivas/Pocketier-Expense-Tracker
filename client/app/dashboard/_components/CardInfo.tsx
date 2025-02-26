import { Budget } from "@/app/interface/budget";
import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

export const CalculateTotalAmountandSpend = (budgetList: Budget | Budget[]) => {
  let totalBudget = 0;
  let totalSpend = 0;

  if (Array.isArray(budgetList)) {
    budgetList.forEach((budgetItem: Budget) => {
      totalBudget += Number(budgetItem.totalAmount);
      totalSpend +=
        budgetItem.expenses?.reduce(
          (sum, expense) => sum + Number(expense.amount),
          0
        ) || 0;
    });
  } else {
    totalBudget = Number(budgetList.totalAmount);
    totalSpend =
      budgetList.expenses?.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
      ) || 0;
  }

  return { totalBudget, totalSpend };
};

function CardInfo({ budgetList }: { budgetList: Budget[] }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    if (budgetList) CalculateCardInfo();
  }, [budgetList]);

  const CalculateCardInfo = () => {
    const data = CalculateTotalAmountandSpend(budgetList);

    setTotalBudget(data.totalBudget);
    setTotalSpend(data.totalSpend);
  };

  return (
    <div>
      {/* {budgetList?.length > 0 ? ( */}
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="p-7 border rounded-lg flex items-center justify-between">
          <div>
            <h2 className="text-sm">Total Budget</h2>
            <h2 className="font-bold text-2xl">${totalBudget}</h2>
          </div>
          <PiggyBank className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
        </div>

        <div className="p-7 border rounded-lg flex items-center justify-between">
          <div>
            <h2 className="text-sm">Total Spend</h2>
            <h2 className="font-bold text-2xl">${totalSpend}</h2>
          </div>
          <ReceiptText className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
        </div>

        <div className="p-7 border rounded-lg flex items-center justify-between">
          <div>
            <h2 className="text-sm">No. of Budget</h2>
            <h2 className="font-bold text-2xl">{budgetList?.length}</h2>
          </div>
          <Wallet className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
        </div>
      </div>
      {/* ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              className="h-[160px] w-full bg-slate-200 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      )} */}
    </div>
  );
}

export default CardInfo;
