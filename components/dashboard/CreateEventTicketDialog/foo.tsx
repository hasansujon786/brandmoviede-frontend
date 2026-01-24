"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field } from "@/components/ui/field";
import { useAdminCreateTicketMutation } from "@/redux/features/admin/ticketApis";
import { useForm } from "@tanstack/react-form";
import { FileInput } from "lucide-react";

export default function CreateEventTicketDialog({
  children,
}: React.PropsWithChildren) {
  const [createTicket, { isLoading }] = useAdminCreateTicketMutation();

  const form = useForm({
    defaultValues: {},
    // validators: {
    //   onSubmit:
    // },
    onSubmit: async ({ value }) => {},
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="bg-card sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Event Ticket</DialogTitle>
          <DialogDescription>
            Create and publish a new event ticket.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="grid gap-5"
        >
          {/* Event Info */}
          <Field>
            <Label htmlFor="title">Event Title</Label>
            <Input id="title" name="title" placeholder="Enter a title" />
          </Field>

          <Field>
            <Label htmlFor="description">Short Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Enter a description"
            />
          </Field>

          <Field>
            <Label htmlFor="thumbnail">Event Image URL</Label>
            <FileInput
              id="thumbnail"
              multiple={false}
              accept="image/*"
              // onChange={(files) => field.handleChange(files[0])}
            />
          </Field>

          {/* Date & Location */}
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" name="startDate" type="date" />
            </Field>

            <Field>
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" name="endDate" type="date" />
            </Field>
          </div>

          <Field>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="Ex: San Francisco, CA"
            />
          </Field>

          {/* Ticketing */}
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <Label htmlFor="price">Ticket Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="Enter ticket price"
              />
            </Field>

            <Field>
              <Label htmlFor="currency">Currency</Label>
              <Select name="currency" defaultValue="EUR">
                <SelectTrigger className="h-14! w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field>
              <Label htmlFor="capacity">Total Capacity</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                placeholder="Ex: 500"
              />
            </Field>

            <Field>
              <Label htmlFor="badge">Ticket Badge</Label>
              <Select name="badge" defaultValue="regular">
                <SelectTrigger className="h-14! w-full">
                  <SelectValue placeholder="Select badge" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          {/* Visibility */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox id="active" name="active" defaultChecked />
              <Label htmlFor="active">Active</Label>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" size="lg" variant="primary-inverse">
                Cancel
              </Button>
            </DialogClose>
            <Button size="lg" variant="primary" type="submit">
              Create Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
