import { Budget } from "@/app/interface/budget";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarChartDashboard({ budgetList }: { budgetList: Budget[] }) {
  const router = useRouter();
  const isEmpty = !budgetList || budgetList.length === 0;

  const transformedData = budgetList?.map((budget) => ({
    name: budget.name,
    totalAmount: Number(budget.totalAmount),
    totalSpend:
      budget.expenses?.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
      ) || 0,
  }));

  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg">Activity</h2>

      {isEmpty ? (
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="text-gray-500 text-center mt-5">No data available</p>
          <Button
            onClick={() => router.push("/dashboard/budgets")}
            className="min-w-[8.25rem] w-[8.25rem]"
          >
            Create a Budget
          </Button>
        </div>
      ) : (
        <ResponsiveContainer width={"80%"} height={300}>
          <BarChart
            data={transformedData}
            margin={{ top: 15, right: 5, left: 5, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" />
            <Bar dataKey="totalAmount" stackId="a" fill="#c3c2ff" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default BarChartDashboard;
