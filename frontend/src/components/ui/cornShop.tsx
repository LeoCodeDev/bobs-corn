import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useCornPurchase } from "@/hooks/useCornPurchase";
import { CornAlert } from "../corn/CornAlert";

const CornShop = () => {
  const { purchaseCount, loading, error, lastResponse, handlePurchase } =
    useCornPurchase();

  return (
    <div className="min-h-screen bg-black p-8 flex items-center justify-center">
      <Card className="w-96 bg-zinc-900 border-yellow-600">
        <CardHeader>
          <CardTitle className="text-2xl text-yellow-500 text-center">
            Bob's Corn Shop 🌽
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-yellow-300 text-lg">
              Maíz comprado: <span className="font-bold">{purchaseCount}</span>
            </p>
          </div>

          <CornAlert response={lastResponse} error={error} />
        </CardContent>
        <CardFooter>
          <Button
            onClick={handlePurchase}
            disabled={loading}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold disabled:bg-yellow-800 disabled:text-gray-300"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Comprando...
              </>
            ) : (
              "¡Comprar Maíz!"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CornShop;
