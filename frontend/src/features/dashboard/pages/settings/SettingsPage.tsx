import { useTranslation } from "react-i18next";
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

const NOTIFICATION_KEYS = ["shipmentUpdates", "marketingEmails", "weeklyDigest"] as const;

export default function SettingsPage() {
  const { t } = useTranslation();
  useDocumentTitle("Settings | Dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {t("settings.title")}
        </h2>
        <p className="text-muted-foreground">{t("settings.subtitle")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("settings.notifications")}</CardTitle>
          <CardDescription>{t("settings.notificationsDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {NOTIFICATION_KEYS.map((k) => (
            <label key={k} className="flex items-center gap-3 text-sm">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-input" />
              {t(`settings.${k}`)}
            </label>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("settings.apiToken")}</CardTitle>
          <CardDescription>{t("settings.apiTokenDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input readOnly value="demo.usr_demo.abc12345" />
          <Button variant="outline">{t("settings.regenerate")}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
