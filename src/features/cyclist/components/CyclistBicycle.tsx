import type { Bicycle } from "../types/bicycle";
import { useState } from "react";
import { useCyclistBicyclesOwner } from "../hooks/useCyclistProfile";
import { Bike, Calendar, Palette, Pencil, Plus, Ruler } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

export default function CyclistBicycle() {
    const [page, setPage] = useState(1);
    const [pageSize] = useState(6);

    const { data, isLoading, error } = useCyclistBicyclesOwner({
        page,
        per_page: pageSize,
    });

    console.log("API response:", data);
    console.log("Bicycle data:", data?.data);
    console.log("Loading:", isLoading);
    console.log("Error:", error);

    const bicycles = data?.data ?? [];

    console.log("Bicycles:", bicycles);

    return (
        <>
            <div className="mx-auto w-full space-y-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            My Bicycles
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Manage your registered bicycles.
                        </p>
                    </div>

                    <Button> 
                        <Plus className="mr-2 h-4 w-4" /> 
                        Add Bicycle 
                    </Button>
                </div>

                {isLoading && (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <Card
                                key={item}
                                className="border-0 shadow-sm"
                            >
                                <CardContent className="p-6">
                                    <div className="animate-pulse space-y-4">
                                        <div className="h-12 w-12 rounded-xl bg-slate-200" /> 
                                        <div className="h-5 w-32 rounded bg-slate-200" /> 
                                        <div className="h-4 w-24 rounded bg-slate-200" /> 
                                        <div className="h-20 rounded bg-slate-200" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {isLoading && bicycles.length === 0 && (
                    <Card className="border-dashed shadow-none">
                        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="mb-4 rounded-full bg-slate-100 p-4">
                                <Bike className="h-8 w-8 text-slate-400" /> 
                            </div> 
                            <h3 className="text-lg font-semibold text-slate-900"> 
                                No bicycles registered 
                            </h3> 
                            <p className="mt-1 max-w-sm text-sm text-slate-500"> 
                                Add your bicycle so mechanics can see its information when you request a service. 
                            </p> 
                            <Button className="mt-5"> 
                                <Plus className="mr-2 h-4 w-4" /> 
                                Add Bicycle 
                            </Button> 
                        </CardContent>
                    </Card>
                )}

                {!isLoading && bicycles.length > 0 && (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {bicycles.map((bicycle: Bicycle) => (
                            <Card
                                key={bicycle.uuid}
                                className="group overflow-hidden border-0 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                            >
                                <CardHeader className="border-b bg-white pb-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-xl bg-slate-100 p-3"> 
                                                <Bike className="h-6 w-6 text-slate-700" /> 
                                            </div>

                                            <div> 
                                                <CardTitle className="text-base"> 
                                                    {bicycle.brand} 
                                                </CardTitle> 
                                                <p className="text-sm text-slate-500"> 
                                                    {bicycle.model} 
                                                </p> 
                                            </div>
                                        </div>

                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            aria-label={`Edit ${bicycle.brand} ${bicycle.model}`} className="opacity-0 transition-opacity group-hover:opacity-100" > 
                                            <Pencil className="h-4 w-4" /> 
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4 p-5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <Bike className="h-4 w-4" />
                                            <span>Type</span>
                                        </div>

                                        <span className="text-sm font-medium text-slate-900"> 
                                            {bicycle.type} 
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-slate-500"> 
                                            <Palette className="h-4 w-4" /> 
                                            <span>Color</span> 
                                        </div> 
                                        
                                        <span className="text-sm font-medium text-slate-900"> 
                                            {bicycle.color} 
                                        </span> 
                                    </div>

                                    <div className="flex items-center justify-between"> 
                                        <div className="flex items-center gap-2 text-sm text-slate-500"> 
                                            <Ruler className="h-4 w-4" /> 
                                            <span>Frame Size</span> 
                                        </div> 
                                        <span className="text-sm font-medium text-slate-900"> 
                                            {bicycle.frame_size} 
                                        </span> 
                                    </div>

                                    <div className="flex items-center justify-between"> 
                                        <div className="flex items-center gap-2 text-sm text-slate-500"> 
                                            <Calendar className="h-4 w-4" /> 
                                            <span>Year</span> 
                                        </div> 
                                        <span className="text-sm font-medium text-slate-900"> 
                                            {bicycle.year} 
                                        </span> 
                                    </div>
                                </CardContent>
                                <div className="border-t bg-slate-50 px-5 py-3"> 
                                    <span className="text-xs text-slate-400"> 
                                        Registered bicycle 
                                    </span> 
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {!isLoading && bicycles.length > 0 && (
                    <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-slate-500"> 
                            Showing{" "} 
                            <span className="font-medium text-slate-700"> 
                                {data?.from ?? 0} 
                            </span>{" "} to{" "} 
                            <span className="font-medium text-slate-700"> 
                                {data?.to ?? 0} 
                            </span>{" "} 
                            of{" "} 
                            <span className="font-medium text-slate-700"> 
                                {data?.total ?? 0} 
                            </span>{" "} 
                            bicycles 
                        </p>

                        <div className="flex items-center gap-2">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                disabled={!data?.prev_page_url} 
                                onClick={() => setPage((prev) => prev - 1)} 
                            > 
                                Previous 
                            </Button>

                            <span className="px-2 text-sm text-slate-500"> 
                                Page{" "} 
                                {data?.current_page ?? 1}{" "} 
                                of{" "} 
                                {data?.last_page ?? 1} 
                            </span>

                            <Button 
                                variant="outline" 
                                size="sm" 
                                disabled={!data?.next_page_url} 
                                onClick={() => setPage((prev) => prev + 1)} 
                            > 
                                Next 
                            </Button>
                        </div>
                    </div>
                    
                )}
            </div>
        </>
    );
}