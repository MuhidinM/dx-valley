"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import React from "react";
 const Page : React.FC  = () =>{
  const [status, setStatus] = useState<
    "initial" | "unsubscribed" | "reconsidered" | "error"
  >("initial");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (!email) {
      setStatus("error");
      setMessage("Email is required to unsubscribe.");
    }
  }, [email]);

  const handleUnsubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/newapi/unsubscribe?email=${email}`);
      const data = await res.json();

      if (data.unsubscribed) {
        setStatus("unsubscribed");
        setMessage("You have been unsubscribed successfully.");
      } else {
        setStatus("error");
        setMessage(data.message || "Unsubscribe failed.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setStatus("reconsidered");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Unsubscribe from Dx Valley</CardTitle>
          <CardDescription>We&apos;re sorry to see you go!</CardDescription>
        </CardHeader>
        <CardContent>
          {status === "initial" && (
            <p>
              Are you sure you want to unsubscribe {email} from our newsletter?
            </p>
          )}
          {status === "unsubscribed" && (
            <p className="text-center text-green-600">{message}</p>
          )}
          {status === "reconsidered" && (
            <p className="text-center text-blue-600">
              Thank you for reconsidering! We&apos;re glad you&apos;re staying
              with us.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-red-600">{message}</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          {status === "initial" && (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={loading}>
                    {loading ? "Processing..." : "Unsubscribe"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. You will stop receiving our
                      newsletter and updates.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleUnsubscribe}>
                      {loading ? "Processing..." : "Confirm"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
          {(status === "unsubscribed" ||
            status === "reconsidered" ||
            status === "error") && (
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
            >
              Go to DxValley website
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
export default Page;
