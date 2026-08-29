import { Card, CardContent } from "../../../components/ui/card";

export default function StatisticsCard() {
    return (
        <Card className="rounded-2xl shadow-xl">

            <CardContent className="grid grid-cols-4 gap-10 py-5">

                <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">
                        Services
                    </p>
                </div>

                <div>
                    <p className="text-2xl font-bold">4.8</p>
                    <p className="text-sm text-muted-foreground">
                        Avg Rating
                    </p>
                </div>

                <div>
                    <p className="text-2xl font-bold">
                        ₱4,280
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Total Spent
                    </p>
                </div>

                <div>
                    <p className="text-2xl font-bold">
                        6 min
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Avg Wait
                    </p>
                </div>

            </CardContent>

        </Card>
    );
}