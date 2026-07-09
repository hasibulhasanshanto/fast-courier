import { Link } from "react-router";
import { ArrowUpRight, Package, Truck, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth";
import { useDocumentTitle } from "@/hooks";
import { ROUTES } from "@/config";

const STATS = [
  { key: "shipments", value: "24", icon: Package, trend: "+12%" },
  { key: "transit", value: "8", icon: Truck, trend: "+3%" },
  { key: "customers", value: "1,284", icon: Users, trend: "+5%" },
] as const;

export default function DashboardHomePage() {
  const { t } = useTranslation();
  useDocumentTitle("Dashboard | Fast Courier");
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {t("dashboard.greeting", { name: user?.name ?? "there" })}{" "}
          {t("dashboard.wave")}
        </h2>
        <p className="text-muted-foreground">{t("dashboard.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STATS.map(({ key, value, icon: Icon, trend }) => (
          <Card key={key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t(`dashboard.${key}`)}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
              <p className="text-xs text-muted-foreground">
                {t("dashboard.trend", { value: trend })}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.quickActions")}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button asChild>
            <Link to={ROUTES.profile}>
              {t("dashboard.editProfile")}
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to={ROUTES.settings}>
              {t("dashboard.settings")}
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
