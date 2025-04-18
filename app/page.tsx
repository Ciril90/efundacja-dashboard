import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import { useState } from "react";

const data = [
  {
    city: "Warszawa",
    coverage: 92,
    refunds: 3,
    status: "OK"
  },
  {
    city: "Wrocław",
    coverage: 145,
    refunds: 1,
    status: "Nadmiar"
  },
  {
    city: "Rzeszów",
    coverage: 35,
    refunds: 22,
    status: "Ryzyko"
  }
];

const facilities = [
  {
    name: "Centrum Medyczne Alfa",
    city: "Warszawa",
    slots: 120,
    usage: "78%",
    roi: "High",
    nps: 9,
    status: "Aktywna"
  },
  {
    name: "Przychodnia Beta",
    city: "Rzeszów",
    slots: 25,
    usage: "32%",
    roi: "Niskie",
    nps: 5,
    status: "Do przeglądu"
  }
];

export default function Dashboard() {
  const [filterCity, setFilterCity] = useState("");

  const filteredFacilities = facilities.filter((item) =>
    item.city.toLowerCase().includes(filterCity.toLowerCase())
  );

  const filteredCities = data.filter((item) =>
    item.city.toLowerCase().includes(filterCity.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard refundacyjny</h1>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Filtruj po mieście..."
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          className="w-64"
        />
        <Button variant="secondary" onClick={() => setFilterCity("")}>Wyczyść</Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Pokrycie miast</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Miasto</TableHead>
                <TableHead>Pokrycie (%)</TableHead>
                <TableHead>Refundacje (%)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCities.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.city}</TableCell>
                  <TableCell>{item.coverage}%</TableCell>
                  <TableCell>{item.refunds}%</TableCell>
                  <TableCell>
                    <Badge variant={
                      item.status === "Ryzyko"
                        ? "destructive"
                        : item.status === "Nadmiar"
                        ? "outline"
                        : "default"
                    }>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Placówki</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nazwa</TableHead>
                <TableHead>Miasto</TableHead>
                <TableHead>Sloty/tydz.</TableHead>
                <TableHead>Wykorzystanie</TableHead>
                <TableHead>ROI</TableHead>
                <TableHead>NPS</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFacilities.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.city}</TableCell>
                  <TableCell>{item.slots}</TableCell>
                  <TableCell>{item.usage}</TableCell>
                  <TableCell>{item.roi}</TableCell>
                  <TableCell>{item.nps}</TableCell>
                  <TableCell>
                    <Badge variant={
                      item.status === "Do przeglądu"
                        ? "outline"
                        : "default"
                    }>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
