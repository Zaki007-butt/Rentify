import { useState } from "react";
import { useUpdateUtilityBillMutation } from "../../react-query/mutations/utility-bill.mutation";

const UtilityBillPaymentForm = ({ bill, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState(null);
  const updateBillMutation = useUpdateUtilityBillMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const formData = new FormData();
    formData.append("paid_amount", amount);
    if (receipt) {
      formData.append("payment_receipt", receipt);
    }

    try {
      await updateBillMutation.mutateAsync({
        id: bill.id,
        data: formData,
      });

      setAmount("");
      setReceipt(null);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error updating bill:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-32 px-2 py-1 text-sm border rounded"
        />
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setReceipt(e.target.files[0])}
          className="text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={updateBillMutation.isPending}
        className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
      >
        {updateBillMutation.isPending ? "Paying..." : "Pay"}
      </button>
    </form>
  );
};

export default UtilityBillPaymentForm;
