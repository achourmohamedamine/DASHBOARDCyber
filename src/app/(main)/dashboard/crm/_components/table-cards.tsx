"use client";

import * as React from "react";

import { Plus, Server, MoreVertical, Trash2, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface MonitoredDevice {
  id: number;
  name: string;
  macAddress: string;
  percentage: number;
}

export function MonitoredDevicesCard() {
  const [devices, setDevices] = React.useState<MonitoredDevice[]>([
    { id: 1, name: "Device 1", macAddress: "00:1B:44:11:3A:B7", percentage: 42 },
    { id: 2, name: "Device 2", macAddress: "00:1B:44:11:3A:B8", percentage: 18 },
    { id: 3, name: "Device 3", macAddress: "00:1B:44:11:3A:B9", percentage: 56 },
    { id: 4, name: "Device 4", macAddress: "00:1B:44:11:3A:C0", percentage: 23 },
    { id: 5, name: "Device 5", macAddress: "00:1B:44:11:3A:C1", percentage: 67 },
    { id: 6, name: "Device 6", macAddress: "00:1B:44:11:3A:C2", percentage: 31 },
    { id: 7, name: "Device 7", macAddress: "00:1B:44:11:3A:C3", percentage: 15 },
    { id: 8, name: "Device 8", macAddress: "00:1B:44:11:3A:C4", percentage: 49 },
    { id: 9, name: "Device 9", macAddress: "00:1B:44:11:3A:C5", percentage: 28 },
    { id: 10, name: "Device 10", macAddress: "00:1B:44:11:3A:C6", percentage: 37 },
  ]);

  const [isOpen, setIsOpen] = React.useState(false);
  const [newDeviceName, setNewDeviceName] = React.useState("");
  const [newDeviceMac, setNewDeviceMac] = React.useState("");
  const [newDevicePercentage, setNewDevicePercentage] = React.useState("");

  const handleAddDevice = () => {
    if (newDeviceName && newDeviceMac && newDevicePercentage) {
      const newDevice: MonitoredDevice = {
        id: devices.length + 1,
        name: newDeviceName,
        macAddress: newDeviceMac,
        percentage: parseInt(newDevicePercentage),
      };
      setDevices([...devices, newDevice]);
      setNewDeviceName("");
      setNewDeviceMac("");
      setNewDevicePercentage("");
      setIsOpen(false);
    }
  };

  const handleDeleteDevice = (id: number) => {
    setDevices(devices.filter((device) => device.id !== id));
  };

  return (
    <Card data-slot="card">
      <CardHeader>
        <CardTitle>Monitored Devices</CardTitle>
        <CardDescription>Track performance metrics for your monitored servers</CardDescription>
        <CardAction>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus />
                <span className="hidden lg:inline">Add Device</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Monitored Device</DialogTitle>
                <DialogDescription>Add a new server or device to your monitoring dashboard.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="device-name">Device Name</Label>
                  <Input
                    id="device-name"
                    placeholder="e.g., Device 11"
                    value={newDeviceName}
                    onChange={(e) => setNewDeviceName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mac-address">MAC Address</Label>
                  <Input
                    id="mac-address"
                    placeholder="e.g., 00:1B:44:11:3A:C7"
                    value={newDeviceMac}
                    onChange={(e) => setNewDeviceMac(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="device-percentage">Usage Percentage</Label>
                  <Input
                    id="device-percentage"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="e.g., 45"
                    value={newDevicePercentage}
                    onChange={(e) => setNewDevicePercentage(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddDevice}>Add Device</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {devices.map((device) => (
            <div key={device.id} className="flex items-center gap-3">
              <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
                <Server className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{device.name}</p>
                    <p className="text-muted-foreground text-xs">{device.macAddress}</p>
                  </div>
                  <span className="text-muted-foreground text-xs font-medium tabular-nums">{device.percentage}%</span>
                </div>
                <Progress value={device.percentage} className="h-1.5" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteDevice(device.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
