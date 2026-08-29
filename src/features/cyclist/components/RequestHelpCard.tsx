import { Wrench } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";

export default function RequestHelpCard() {
    return (
        <Card className="w-80 rounded-2xl shadow-xl">
            <CardContent className="space-y-4 p-6">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Good morning 👋
                    </p>

                    <h2 className="text-2xl font-bold">
                        Need a mechanic?
                    </h2>
                </div>

                <Button className="w-full rounded-full h-12">
                    <Wrench className="mr-2 h-4 w-4" />
                    Request Emergency Help
                </Button>
            </CardContent>
        </Card>
    );
}