import { Card } from "../../../components/ui/card";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Avatar } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";

export default function NearbyMechanicCard() {
    return (
        <Card className="flex flex-col flex-1 w-full">
            <Tabs
                defaultValue="nearby"
                className="flex flex-1 flex-col"
            >
                <TabsList className="grid w-full grid-cols-2 rounded-none">
                    <TabsTrigger value="nearby">
                        Nearby
                    </TabsTrigger>

                    <TabsTrigger value="history">
                        History
                    </TabsTrigger>
                </TabsList>

                <TabsContent
                    value="nearby"
                    className="flex flex-1 flex-col overflow-hidden mt-0"
                >
                    <ScrollArea className="h-full">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between border-b p-4"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar />

                                    <div>
                                        <p className="font-semibold">
                                            Carlos Rivera
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            0.8 km • ★4.9 • 142 Jobs
                                        </p>
                                    </div>
                                </div>

                                <Badge>
                                    Available
                                </Badge>
                            </div>
                        ))}
                    </ScrollArea>
                </TabsContent>

                <TabsContent
                    value="history"
                    className="flex-1 overflow-hidden mt-0"
                >
                    <ScrollArea className="h-full">
                        {/* History List */}
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </Card>
    );
}