import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useThemeStore, type ThemeMode } from "@/features/preferences";

const OPTIONS: { value: ThemeMode; Icon: typeof Sun; key: "light" | "dark" | "system" }[] =
  [
    { value: "light", Icon: Sun, key: "light" },
    { value: "dark", Icon: Moon, key: "dark" },
    { value: "system", Icon: Monitor, key: "system" },
  ];

export function ThemeSwitcher() {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  const active = OPTIONS.find((o) => o.value === theme) ?? OPTIONS[2];
  const ActiveIcon = active.Icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("common.theme")}
          title={t("common.theme")}
        >
          <ActiveIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {OPTIONS.map(({ value, Icon, key }) => (
          <DropdownMenuItem
            key={value}
            onSelect={() => setTheme(value)}
            className={theme === value ? "bg-muted" : ""}
          >
            <Icon className="h-4 w-4" />
            {t(`theme.${key}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
