"use client";
// import Image from "next/image";
// import avatar from "@/asset/avatar.jpg"
import NotiIcon from "@/asset/icon/NotiIcon";
import LogoIconSmall from "@/asset/icon/LogoSmall";
import useTab from "@/components/Tabbar/useTab";
import Tabs from "@/components/Tabbar/Tabs";
import Tab from "@/components/Tabbar/Tab";
import DistanceIcon from "@/asset/icon/DistanceIcon";
import DurationIcon from "@/asset/icon/DurationIcon";
import CalIcon from "@/asset/icon/CalIcon";
import AvgPaceIcon from "@/asset/icon/AvgPaceIcon";
import ArrowDropDown from "@/asset/icon/ArrowDropDown";
import RunningIcon from "@/asset/icon/RunningIcon";
import Token from "@/asset/icon/Token";
import TimeIcon from "@/asset/icon/TimeIcon";
import LocationIcon from "@/asset/icon/LocationIcon";
import StepIcon from "@/asset/icon/StepIcon";
import DurationSmall from "@/asset/icon/DurationSmall";
import SwimIcon from "@/asset/icon/SwimIcon";
import DistanceSmall from "@/asset/icon/DistanceSmall";
import RidingIcon from "@/asset/icon/RidingIcon";
import WorkoutIcon from "@/asset/icon/WorkoutIcon";
import CalSmall from "@/asset/icon/CalSmall";
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import StepChart from '@/components/StepChart';
import Step7dayChart from "../SevenDayStep";
import GaugeChart from "../GaugeChart/GaugeChart";
import {Image} from "@nextui-org/image";
import LogoutIcon from "@/asset/icon/LogoutIcon";

interface FitnessData {
    steps: number,
    distance: number
}

interface StepData {
    date: string;
    steps: number;
  }
  

const Account = () => {
    const [selectedTab, setSelectedTab] = useTab('2');
    function changeTabHandler(value: string) {
        setSelectedTab(value);
    }
    const [stepData, setStepData] = useState<StepData[]>([]);
    const [fitData, setFitData] = useState<FitnessData>({steps:0,distance:0});
    const { data: session } = useSession() || {};
    useEffect(() => {
        async function fetchStepData() {
          const response = await fetch('/api/getDailyStep');
          const data = await response.json();
          console.log(data);
          setStepData(data);
        }

        async function fetchFitData() {
            const response = await fetch('/api/getFitnessData');
            const data = await response.json();
            setFitData(data);
          }

        fetchStepData();
        fetchFitData();
      }, []);

    return (
        <>
            <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-3">
                    {/* <Image src={avatar} alt='avatar' className="w-10 h-10 rounded-full border-2 border-stone-900 object-cover" /> */}
                    <Image
                        isZoomed
                        width={45}
                        radius="full"
                        alt="NextUI Fruit Image with Zoom"
                        src={session?.user?.image ?? "/path/to/default/image.jpg"}
                    />
                    <span className="font-bold">{session?.user?.name}</span>
                </div>
                <button onClick={() => signOut()}>
                    <LogoutIcon />
                </button>
            </div>

            <div className="card">
                <h1 className="font-bold">Beginner</h1>
                <div className="my-1 flex items-center">
                    <LogoIconSmall /><span className="text-[32px] leading-normal font-bold">256</span>
                </div>
                <div className="flex items-center gap-x-6">
                    <div>
                        <h2 className="text-[10px] font-medium">Total distances</h2>
                        <div>
                            <span className="text-xl leading-normal font-bold">25.06</span> <span className="text-xs leading-normal">km</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-[10px] font-medium">Total time</h2>
                        <div>
                            <span className="text-xl leading-normal font-bold">25</span> <span className="text-xs leading-normal">hrs</span>
                            {" "}
                            <span className="text-xl leading-normal font-bold">06</span> <span className="text-xs leading-normal">min</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center my-8">
                <GaugeChart value={fitData.steps} maxValue={10000} />
            </div>
            <div className="my-10">
                <h1 className="text-center mb-4 text-xl font-bold">Your step in 7 days ago</h1>
                {stepData.length > 0 ? (
                    <Step7dayChart data={stepData} />
                ) : (
                    <p className="text-center">Loading step data...</p>
                )}
            </div>  

            <Tabs
                value={selectedTab}
                onChange={changeTabHandler}
            >
                <Tab index="0">Swimming</Tab>
                <Tab index="1">Riding</Tab>
                <Tab index="2">Running</Tab>
                <Tab index="3">Workout</Tab>
            </Tabs>

            <div className="mt-8">
                <div className="mb-10 grid grid-cols-2 gap-4 text-xl leading-normal font-bold">
                    <div className="px-4 py-2 flex items-center gap-x-3 border border-[#521400]/0.1 rounded-lg">
                        <div className="p-2 bg-[#FFFCEB] border border-[#FFF3AD] rounded-full"><DistanceIcon /></div>
                        <div>
                            <h3 className="text-xs leading-normal text-[#F5BC00]">Distance</h3>
                            <span>{(fitData.distance / 1000).toFixed(2)}</span> <span className="text-xs leading-normal text-[#81819C]">km</span>
                        </div>
                    </div>
                    <div className="px-4 py-2 flex items-center gap-x-3 border border-[#521400]/0.1 rounded-lg">
                        <div className="p-2 bg-[#FFFCEB] border border-[#FFF3AD] rounded-full"><DurationIcon /></div>
                        <div>
                            <h3 className="text-xs leading-normal text-[#2EAADC]">Duration</h3>
                            <span>6.78</span> <span className="text-xs leading-normal text-[#81819C]">min</span>
                        </div>
                    </div>
                    <div className="px-4 py-2 flex items-center gap-x-3 border border-[#521400]/0.1 rounded-lg">
                        <div className="p-2 bg-[#FFFCEB] border border-[#FFF3AD] rounded-full"><AvgPaceIcon /></div>
                        <div>
                            <h3 className="text-xs leading-normal text-[#1FB319]">Avg Pace</h3>
                            <span>6.78</span> <span className="text-xs leading-normal text-[#81819C]">km</span>
                        </div>
                    </div>
                    <div className="px-4 py-2 flex items-center gap-x-3 border border-[#521400]/0.1 rounded-lg">
                        <div className="p-2 bg-[#FFFCEB] border border-[#FFF3AD] rounded-full"><CalIcon /></div>
                        <div>
                            <h3 className="text-xs leading-normal text-[#FF7547]">Calories</h3>
                            <span>6.78</span> <span className="text-xs leading-normal text-[#81819C]">kcal</span>
                        </div>
                    </div>
                </div>
                {/* <h1 className="mb-4 text-xl leading-normal font-bold">Your result</h1>
                <div className="h-[186px] bg-rose-200">Chart</div> */}
            </div>

            <div className="mb-10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl leading-normal font-bold">Activities</h1>
                    <button className="py-1.5 px-3 flex items-center border border-[#521400]/0.2 rounded-lg">
                        <span className="text-xs font-bold">This week</span>
                        <ArrowDropDown />
                    </button>
                </div>
                <div className="p-3 border border-[#521400]/0.1 rounded-lg">
                    <div className="pb-3 flex items-center justify-between border-b border-b-[#521400]/0.1">
                        <div className="flex items-center gap-2 ">
                            <div className="p-2 bg-[#FFF0EB] border border-[#FFE0D6] rounded-full">
                                <RunningIcon />
                            </div>
                            <div>
                                <span className="font-bold">Running</span><br />
                                <span className="text-[10px] font-medium text-[#81819C]">Monday, August 5</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="text-primary font-bold text-xl leading-normal">+20</div>
                            <Token />
                        </div>
                    </div>
                    <div className="mt-3 flex justify-between items-end">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-1">
                                <TimeIcon />
                                <span className="text-[10px] font-medium text-[#81819C]">05:45 - 07:15</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <LocationIcon />
                                <span className="text-[10px] font-medium text-[#81819C]">District 9, Ho Chi Minh City</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <div className="flex gap-1 px-2 py-0.5 items-center border border-[#521400]/0.1 rounded">
                                <StepIcon />
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-xs leading-normal	font-bold">10.56</span>
                                    <span className="text-[10px] font-medium">km</span>
                                </div>
                            </div>
                            <div className="flex gap-1 px-2 py-0.5 items-center border border-[#521400]/0.1 rounded">
                                <DurationSmall />
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-xs leading-normal	font-bold">1</span>
                                    <span className="text-[10px] font-medium">hr</span>
                                </div>
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-xs leading-normal	font-bold">30</span>
                                    <span className="text-[10px] font-medium">min</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-3 border border-[#521400]/0.1 rounded-lg">
                    <div className="pb-3 flex items-center justify-between border-b border-b-[#521400]/0.1">
                        <div className="flex items-center gap-2 ">
                            <div className="p-2 bg-[#FFFCEB] border border-[#FFF3AD] rounded-full">
                                <SwimIcon />
                            </div>
                            <div>
                                <span className="font-bold">Swimming</span><br />
                                <span className="text-[10px] font-medium text-[#81819C]">Monday, August 5</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="text-primary font-bold text-xl leading-normal">+20</div>
                            <Token />
                        </div>
                    </div>
                    <div className="mt-3 flex justify-between items-end">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-1">
                                <TimeIcon />
                                <span className="text-[10px] font-medium text-[#81819C]">05:45 - 07:15</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <LocationIcon />
                                <span className="text-[10px] font-medium text-[#81819C]">District 9, Ho Chi Minh City</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <div className="flex gap-1 px-2 py-0.5 items-center border border-[#521400]/0.1 rounded">
                                <DistanceSmall />
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-xs leading-normal	font-bold">500</span>
                                    <span className="text-[10px] font-medium">m</span>
                                </div>
                            </div>
                            <div className="flex gap-1 px-2 py-0.5 items-center border border-[#521400]/0.1 rounded">
                                <DurationSmall />
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-xs leading-normal	font-bold">1</span>
                                    <span className="text-[10px] font-medium">hr</span>
                                </div>
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-xs leading-normal	font-bold">30</span>
                                    <span className="text-[10px] font-medium">min</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-3 border border-[#521400]/0.1 rounded-lg">
                    <div className="pb-3 flex items-center justify-between border-b border-b-[#521400]/0.1">
                        <div className="flex items-center gap-2 ">
                            <div className="p-2 bg-[#EEF8FC] border border-[#CBEAF6] rounded-full">
                                <RidingIcon />
                            </div>
                            <div>
                                <span className="font-bold">Riding</span><br />
                                <span className="text-[10px] font-medium text-[#81819C]">Monday, August 5</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="text-primary font-bold text-xl leading-normal">+20</div>
                            <Token />
                        </div>
                    </div>
                    <div className="mt-3 flex justify-between items-end">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-1">
                                <TimeIcon />
                                <span className="text-[10px] font-medium text-[#81819C]">05:45 - 07:15</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <LocationIcon />
                                <span className="text-[10px] font-medium text-[#81819C]">District 9, Ho Chi Minh City</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <div className="flex gap-1 px-2 py-0.5 items-center border border-[#521400]/0.1 rounded">
                                <DistanceSmall />
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-xs leading-normal	font-bold">10.56</span>
                                    <span className="text-[10px] font-medium">km</span>
                                </div>
                            </div>
                            <div className="flex gap-1 px-2 py-0.5 items-center border border-[#521400]/0.1 rounded">
                                <DurationSmall />
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-xs leading-normal	font-bold">1</span>
                                    <span className="text-[10px] font-medium">hr</span>
                                </div>
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-xs leading-normal	font-bold">30</span>
                                    <span className="text-[10px] font-medium">min</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-3 border border-[#521400]/0.1 rounded-lg">
                    <div className="pb-3 flex items-center justify-between border-b border-b-[#521400]/0.1">
                        <div className="flex items-center gap-2 ">
                            <div className="p-2 bg-[#FFEDEB] border border-[#FFDAD6] rounded-full">
                                <WorkoutIcon />
                            </div>
                            <div>
                                <span className="font-bold">Workout</span><br />
                                <span className="text-[10px] font-medium text-[#81819C]">Monday, August 5</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="text-primary font-bold text-xl leading-normal">+20</div>
                            <Token />
                        </div>
                    </div>
                    <div className="mt-3 flex justify-between items-end">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-1">
                                <TimeIcon />
                                <span className="text-[10px] font-medium text-[#81819C]">05:45 - 07:15</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <LocationIcon />
                                <span className="text-[10px] font-medium text-[#81819C]">District 9, Ho Chi Minh City</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <div className="flex gap-1 px-2 py-0.5 items-center border border-[#521400]/0.1 rounded">
                                <CalSmall />
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-xs leading-normal	font-bold">105.6</span>
                                    <span className="text-[10px] font-medium">kcal</span>
                                </div>
                            </div>
                            <div className="flex gap-1 px-2 py-0.5 items-center border border-[#521400]/0.1 rounded">
                                <DurationSmall />
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-xs leading-normal	font-bold">1</span>
                                    <span className="text-[10px] font-medium">hr</span>
                                </div>
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-xs leading-normal	font-bold">30</span>
                                    <span className="text-[10px] font-medium">min</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Account;