import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/features/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@/hooks";

export default function ProfilePage() {
  const { t } = useTranslation();
  useDocumentTitle("Profile | Dashboard");
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {t("profile.title")}
        </h2>
        <p className="text-muted-foreground">{t("profile.subtitle")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("profile.personalDetails")}</CardTitle>
          <CardDescription>{t("profile.personalDetailsDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                {t("profile.name")}
              </label>
              <Input id="name" defaultValue={user?.name} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                {t("profile.email")}
              </label>
              <Input
                id="email"
                type="email"
                defaultValue={user?.email}
                disabled
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>{t("common.saveChanges")}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
